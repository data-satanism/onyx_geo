# The following prompts are used for verifying if the user's query can be answered by the current
# system. Many new users do not understand the design/capabilities of the system and will ask
# questions that are unanswerable such as aggregations or user specific questions that the system
# cannot handle, this is used to identify those cases
from onyx.prompts.constants import ANSWERABLE_PAT
from onyx.prompts.constants import GENERAL_SEP_PAT
from onyx.prompts.constants import QUESTION_PAT
from onyx.prompts.constants import THOUGHT_PAT


ANSWERABLE_PROMPT = f"""
Ты — инструмент для определения, может ли система ответить на пользовательский запрос \
с использованием Retrieval-Augmented Generation (RAG). 
Основная система будет пытаться ответить, используя ТОЛЬКО 5 наиболее релевантных \
документов, найденных по запросу. Источники содержат актуальные и корпоративные \
геолого-экономические данные. 
 
Для неизвестных или новых объектов/месторождений предполагается, что поиск \
найдет релевантные и согласованные сведения. 
 
Система не предназначена для написания кода. 
Система не может выполнять запросы к структурированным базам данных (например, SQL). 
Если вопрос не требует кода или SQL, предполагается, что он может быть обработан без них. 
 
Определи, должна ли система пытаться ответить. 
"ANSWERABLE" должен быть строго "True" или "False". 

{GENERAL_SEP_PAT}

{QUESTION_PAT.upper()} Что известно о месторождении {{пример_месторождения}}?
```
{THOUGHT_PAT.upper()} Система анализирует 5 документов, связанных с данным месторождением.
Если документы содержат данные о ресурсах, геологии и экономике, запрос может быть обработан.
{ANSWERABLE_PAT.upper()} True
```

{QUESTION_PAT.upper()} Какие прогнозы по добыче на этом месторождении?
```
{THOUGHT_PAT.upper()} Если прогнозы содержатся только в SQL-базе или не найдены в 5 лучших документах, система не сможет ответить.
{ANSWERABLE_PAT.upper()} False
```

{QUESTION_PAT.upper()} {{user_query}}
""".strip()


# Use the following for easy viewing of prompts
if __name__ == "__main__":
    print(ANSWERABLE_PROMPT)
