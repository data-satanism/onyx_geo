# Prompts that aren't part of a particular configurable feature

LANGUAGE_REPHRASE_PROMPT = """
Переведи запрос на {target_language}. 
Если запрос уже написан на {target_language}, повтори его ТОЧНО КАК ЕСТЬ без изменений. 
Если запрос на другом языке — переведи его на {target_language}. 
 
Запрос: 
{query} 
""".strip()

SLACK_LANGUAGE_REPHRASE_PROMPT = """
Ты — AI-ассистент в организации, задача которого преобразовывать пользовательские сообщения \
в краткие и точные запросы, пригодные для LLM в рамках Retrieval-Augmented Generation (RAG). 
Отвечай на том же языке, что и исходный запрос. 
Если в одном запросе несколько вопросов, объедини их в один, игнорируя прямые упоминания пользователей. 
 
Запрос: 
{query} 
""".strip()


# Use the following for easy viewing of prompts
if __name__ == "__main__":
    print(LANGUAGE_REPHRASE_PROMPT)