# How it works and rationale:
# First - this works best emprically across multiple LLMs, some of this is back-explaining reasons based on results.
#
# The system prompt is kept simple and as similar to typical system prompts as possible to stay within training distribution.
# The history is passed through as a list of messages, this should allow the LLM to more easily understand what is going on.
# The special tokens and separators let the LLM more easily disregard no longer relevant past messages.
# The last message is dynamically created and has a detailed description of the actual task.
# This is based on the assumption that users give much more varied requests in their prompts and LLMs are well adjusted to this.
# The proximity of the instructions and the lack of any breaks should also let the LLM follow the task more clearly.
#
# For document verification, the history is not included as the queries should ideally be standalone enough.
# To keep it simple, it is just a single simple prompt.


SEMANTIC_QUERY_REPHRASE_SYSTEM_PROMPT = """
Ты — аналитик и помощник по переработке пользовательских сообщений в автономные запросы, подходящие для \
semantic search. Цель — сформулировать единый, понятный запрос, который полностью отражает смысл \
последнего сообщения пользователя. Запрос должен быть естественным языком, если это не ключевой запрос. 
При необходимости используй контекст истории чата или знания о пользователе. 
 
Текущая дата: {current_date}. 
"""

SEMANTIC_QUERY_REPHRASE_USER_PROMPT = """
Используя историю чата и финальный запрос пользователя, сформулируй автономный запрос, \
максимально отражающий смысл пользователя. Обычно он совпадает с последним сообщением. 
Если запрос уже является ключевым, оставь его как есть. 
Фокусируйся на последнем сообщении, историю и дополнительный контекст игнорируй. 
 
Примеры модификаций: 
1. Вставка релевантного контекста из истории чата: 
   "Как настроить это?" -> "Как настроить программное обеспечение Y?" (если речь о Y) 
2. Удаление нерелевантных частей: 
   "Можешь резюмировать звонки с компанией X?" -> "звонки с компанией X" 
3. Добавление данных о пользователе: 
   "Какой документ я написал на прошлой неделе?" -> "Какой документ написал John Doe на прошлой неделе?" 
 
{additional_context} 
=========================
 
Финальный запрос пользователя: 
{user_query} 
 
CRITICAL: Предоставляй ТОЛЬКО автономный запрос и ничего лишнего. 
""".strip()

KEYWORD_REPHRASE_SYSTEM_PROMPT = """
Ты — аналитик и помощник по преобразованию сообщений пользователя в набор ключевых запросов, \
подходящих для поиска по ключевым словам. Цель — составить ключевые запросы для эффективного \
нахождения документов, отвечающих на запрос пользователя. При необходимости используй контекст истории чата или знания о пользователе. 
 
Текущая дата: {current_date}. 
"""

KEYWORD_REPHRASE_USER_PROMPT = """
Используя историю чата и финальный запрос пользователя, предоставь набор ключевых запросов \
для поиска документов. Один запрос на строку (каждый состоит из одного или нескольких ключевых слов). 
Запросы должны быть только ключевыми словами, без естественного языка. 
Каждый запрос должен содержать минимальное количество слов для представления смысла. 
 
Правила: 
- Не более 3 запросов. 
- Не заменяй узкоспециализированные термины. 
- Фокус на последнем сообщении пользователя, историю и дополнительный контекст игнорируй. 
{additional_context} 
 
=========================
 
Финальный запрос пользователя: 
{user_query} 
 
CRITICAL: Только ключевые запросы, один набор ключевых слов на строку и ничего лишнего. 
""".strip()


REPHRASE_CONTEXT_PROMPT = """
В большинстве случаев дополнительный контекст не требуется. Если релевантно, вот информация о пользователе: \
{user_info} 

Память о пользователе: \
{memories} 
"""


# This prompt is intended to be fairly lenient since there are additional filters downstream.
# There are now multiple places for misleading docs to get dropped so each one can be a bit more lax.
# As models get better, it's likely better to include more context than not, some questionably
# useful stuff may be helpful downstream.
# Adding the ! option to allow better models to handle questions where all of the documents are
# necessary to make a good determination.
# If a document is by far the best and is a very obvious inclusion, add a ! after the section_id to indicate that it should \
# be included in full. Example output: [8, 2!, 5].
DOCUMENT_SELECTION_PROMPT = """
Выбери наиболее релевантные разделы документов для запроса пользователя (максимум {max_sections}). 
 
# Разделы документа 
```
{formatted_doc_sections}
``` 
 
# Запрос пользователя 
```
{user_query}
``` 
 
# Критерии выбора
- Выбирай разделы, наиболее релевантные ответу на запрос. 
- Даже если раздел частично полезен, включи его. 
- Разрешено включение нескольких разделов из одного документа. 
- Рассматривай косвенные связи и дополнительный контекст как полезные. 
 
# Формат вывода 
Только section_ids через запятую, по убыванию релевантности: 
[most_relevant_section_id, second_most_relevant_section_id, ...] 
 
Идентификаторы разделов: 
""".strip()


# Some models are trained heavily to reason in the actual output so we allow some flexibility in the prompt.
# Downstream of the model, we will attempt to parse the output to extract the number.
# This inference will not have a system prompt as it's a single message task more like the traditional ones.
# LLMs should do better with just this type of next word prediction.
# Opted to not include metadata here as the doc was already selected by the previous step that has it.
# Also hopefully it leans not throwing out documents as there are not many bad ones that make it to this stage.
# If anything, it's mostly because of something misleading, otherwise this step should be treated as 95% expansion/filtering.
DOCUMENT_CONTEXT_SELECTION_PROMPT = """
Проанализируй релевантность разделов документа к поисковому запросу и классифицируй согласно категориям: 
 
# Заголовок / Метаданные документа 
```
{document_title}
``` 
 
# Предыдущий раздел 
```
{section_above}
``` 

# Основной раздел 
```
{main_section}
``` 

# Следующий раздел 
```
{section_below}
``` 

# Запрос пользователя 
```
{user_query}
``` 
 
# Категории классификации: 
**1 - NOT_RELEVANT** 
- Основной раздел и соседние не помогают ответить на запрос. 
 
**2 - MAIN_SECTION_ONLY** 
- Основной раздел содержит полезную информацию, соседние — нет. 
 
**3 - INCLUDE_ADJACENT_SECTIONS** 
- Основной и соседние разделы полезны для ответа. 
 
**4 - INCLUDE_FULL_DOCUMENT** 
- Все разделы документа вероятно содержат полезную информацию. 
 
## Дополнительно 
- Если только небольшая часть раздела полезна — используй 2 или 3, не 1. 
- Если документ полностью по теме и предоставляет контекст — 2, 3 или 4, не 1. 
- Не путай разные контексты и темы — если документ не про нужный объект, выбирай 1. 
 
CRITICAL: Только номер ситуации (1, 2, 3 или 4). 
""".strip()