# The following prompts are used for the initial response before a chat history exists
# It is used also for the one shot direct QA flow
import json

from onyx.prompts.constants import DEFAULT_IGNORE_STATEMENT
from onyx.prompts.constants import FINAL_QUERY_PAT
from onyx.prompts.constants import GENERAL_SEP_PAT
from onyx.prompts.constants import QUESTION_PAT
from onyx.prompts.constants import THOUGHT_PAT


ONE_SHOT_SYSTEM_PROMPT = """
Ты — аналитический LLM-ассистент по геолого-экономической оценке месторождений. \
Ты обрабатываешь текстовые данные, технические отчёты и нормативные документы, \
чтобы предоставлять точные, фактические и структурированные ответы на запросы.
""".strip()

ONE_SHOT_TASK_PROMPT = """
Ответь на приведённый запрос с учётом контекста, если он релевантен. \
Игнорируй любую информацию, которая не относится к геолого-экономическому анализу, \
оценке ресурсов, бурению, экономическим ограничениям или стандартам JORC / NI 43-101 / SAMREC.
""".strip()

WEAK_MODEL_SYSTEM_PROMPT = """
Используй предоставленные справочные документы для точного ответа на запрос.
""".lstrip()

WEAK_MODEL_TASK_PROMPT = """
Ответь на пользовательский запрос, опираясь только на данные из справочного документа, \
не делай никаких дополнительных предположений или интерпретаций.
"""

REQUIRE_JSON = """
Ты ОБЯЗАН отвечать строго в JSON-формате, содержащем:
— ключ 'answer' с полным аналитическим ответом;
— ключ 'quotes' с точными цитатами из предоставленных документов.
""".strip()

JSON_HELPFUL_HINT = """
Подсказка: сформулируй ответ максимально подробно и структурированно.
Цитаты ДОЛЖНЫ быть точными подстроками из предоставленных документов, \
без изменений.
""".strip()

CONTEXT_BLOCK = f"""
REFERENCE DOCUMENTS:
{GENERAL_SEP_PAT}
{{context_docs_str}}
{GENERAL_SEP_PAT}
"""

HISTORY_BLOCK = f"""
CONVERSATION HISTORY:
{GENERAL_SEP_PAT}
{{history_str}}
{GENERAL_SEP_PAT}
"""


# This has to be doubly escaped due to json containing { } which are also used for format strings
EMPTY_SAMPLE_JSON = {
    "answer": "Поместите здесь полный, детализированный аналитический ответ по геолого-экономической оценке месторождения.",
    "quotes": [
        "каждая цитата должна быть ТОЧНО из контекстных документов без изменений!",
        "ПОДСКАЗКА: цитаты не показываются пользователю!",
    ],
}

# Default json prompt which can reference multiple docs and provide answer + quotes
# system_like_header is similar to system message, can be user provided or defaults to QA_HEADER
# context/history blocks are for context documents and conversation history, they can be blank
# task prompt is the task message of the prompt, can be blank, there is no default
JSON_PROMPT = f"""
{{system_prompt}}
{REQUIRE_JSON}
{{context_block}}{{history_block}}
{{task_prompt}}

SAMPLE RESPONSE:
```
{{{json.dumps(EMPTY_SAMPLE_JSON)}}}
```

{FINAL_QUERY_PAT.upper()}
{{user_query}}

{JSON_HELPFUL_HINT}
{{language_hint_or_none}}
""".strip()


# similar to the chat flow, but with the option of including a
# "conversation history" block
CITATIONS_PROMPT = f"""
Используй следующие {{context_type}} при подготовке ответа.
{DEFAULT_IGNORE_STATEMENT}

CONTEXT:
{GENERAL_SEP_PAT}
{{context_docs_str}}
{GENERAL_SEP_PAT}

{{history_block}}{{task_prompt}}

{QUESTION_PAT.upper()}
{{user_query}}
"""

# with tool calling, the documents are in a separate "tool" message
# NOTE: need to add the extra line about "getting right to the point" since the
# tool calling models from OpenAI tend to be more verbose
CITATIONS_PROMPT_FOR_TOOL_CALLING = f"""
Используй предоставленные {{context_type}} при подготовке ответа.
{DEFAULT_IGNORE_STATEMENT} \
Отвечай чётко и по существу, без лишних слов.

{{history_block}}{{task_prompt}}

{QUESTION_PAT.upper()}
{{user_query}}
"""



# CURRENTLY DISABLED, CANNOT USE THIS ONE
# Default chain-of-thought style json prompt which uses multiple docs
# This one has a section for the LLM to output some non-answer "thoughts"
# COT (chain-of-thought) flow basically
COT_PROMPT = f"""
{ONE_SHOT_SYSTEM_PROMPT} 
 
CONTEXT: 
{GENERAL_SEP_PAT}
{{context_docs_str}}
{GENERAL_SEP_PAT} 
 
Ты ОБЯЗАН ответить в следующем формате: 
```
{THOUGHT_PAT} Используй этот раздел как рабочее пространство для рассуждений. 
 
{{{json.dumps(EMPTY_SAMPLE_JSON)}}} 
```
 
{QUESTION_PAT.upper()} {{user_query}} 
{JSON_HELPFUL_HINT} 
{{language_hint_or_none}} 
""".strip()


# User the following for easy viewing of prompts
if __name__ == "__main__":
    print(JSON_PROMPT)  # Default prompt used in the Onyx UI flow