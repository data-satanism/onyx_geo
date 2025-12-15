# The following prompts are used to pass each chunk to the LLM (the cheap/fast one)
# to determine if the chunk is useful towards the user query. This is used as part
# of the reranking flow

USEFUL_PAT = "Yes useful"
NONUSEFUL_PAT = "Not useful"
SECTION_FILTER_PROMPT = f"""
Определи, является ли следующий раздел ПОЛЕЗНЫМ для ответа на пользовательский запрос. 
Раздел должен содержать информацию, РЕЛЕВАНТНУЮ и ПРИМЕНИМУЮ к запросу. 
Простое упоминание темы недостаточно — раздел должен содержать конкретные данные или сведения, \
которые помогут формировать ответ на запрос. 
 
Если раздел содержит ЛЮБУЮ полезную информацию, этого достаточно — он не обязан полностью \
отвечать на каждый аспект запроса. 
 
Название: {{title}} 
{{optional_metadata}} 
 
Раздел для анализа: 
```
{{chunk_text}}
``` 
 
Пользовательский запрос: 
```
{{user_query}}
``` 
 
Ответь ТОЧНО И ТОЛЬКО: "{USEFUL_PAT}" или "{NONUSEFUL_PAT}" 
""".strip()


# Use the following for easy viewing of prompts
if __name__ == "__main__":
    print(SECTION_FILTER_PROMPT)