# The following prompts are used for extracting filters to apply along with the query in the
# document index. For example, a filter for dates or a filter by source type such as GitHub
# or Slack
from onyx.prompts.constants import SOURCES_KEY


# Smaller followup prompts in time_filter.py
TIME_FILTER_PROMPT = """
Ты инструмент для определения временных фильтров, применимых к пользовательскому запросу \
для поиска в документальном индексе геолого-экономических данных. Система может \
использовать приоритет свежих данных или применять жёсткий cutoff для исключения \
документов до указанной даты. Определи корректные фильтры для запроса. 
 
Текущая дата и время: {current_day_time_str}. 
 
Всегда отвечай ТОЛЬКО JSON-объектом с ключами: 
- "filter_type" 
- "filter_value" 
- "value_multiple" 
- "date" 
 
Допустимые значения: 
- "filter_type": "hard cutoff", "favors recent", "not time sensitive" 
- "filter_value": "day", "week", "month", "quarter", "half", "year" 
- "value_multiple": любое число 
- "date": дата в формате MM/DD/YYYY, соблюдай всегда этот формат 
""".strip()

# Smaller followup prompts in source_filter.py
# Known issue: LLMs like GPT-3.5 try to generalize. If the valid sources contains "web" but not
# "confluence" and the user asks for confluence related things, the LLM will select "web" since
# confluence is accessed as a website. This cannot be fixed without also reducing the capability
# to match things like repository->github, website->web, etc.
# This is generally not a big issue though as if the company has confluence, hopefully they add
# a connector for it or the user is aware that confluence has not been added.
SOURCE_FILTER_PROMPT = f"""
На основе пользовательского запроса извлеки релевантные источники информации \
для поиска в документальном индексе геолого-экономических данных. 
Ответь JSON-объектом с фильтрами источников или null, если конкретные источники не упомянуты. 
Извлекай источники только если пользователь явно ограничивает область поиска. 
Игнорируй недопустимые или несуществующие источники. 
 
Допустимые источники: 
{{valid_sources}}
{{web_source_warning}}
{{file_source_warning}} 
 
Всегда отвечай ТОЛЬКО JSON с ключом "{SOURCES_KEY}". 
Значение ключа "{SOURCES_KEY}" должно быть null или списком корректных источников. 
 
Пример ответа: 
{{sample_response}} 
""".strip()

WEB_SOURCE_WARNING = """
Примечание: источник "web" применяется только если пользователь явно указывает "website" \
в запросе. Не относится к корпоративным инструментам, таким как Confluence или GitHub. 
""".strip()

FILE_SOURCE_WARNING = """
Примечание: источник "file" применяется только если пользователь ссылается на загруженные \
файлы в запросе. 
""".strip()


# Use the following for easy viewing of prompts
if __name__ == "__main__":
    print(TIME_FILTER_PROMPT)
    print("------------------")
    print(SOURCE_FILTER_PROMPT)