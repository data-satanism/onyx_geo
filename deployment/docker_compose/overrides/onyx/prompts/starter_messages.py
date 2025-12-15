PERSONA_CATEGORY_GENERATION_PROMPT = """
На основе имени ассистента, его описания и инструкций, сгенерируйте {num_categories} \
**уникальные и разнообразные** категории, которые отражают разные типы стартовых сообщений, \
которые пользователь может отправить, чтобы начать диалог с этим чат-ассистентом. 
 
**Убедитесь, что категории релевантны и охватывают темы, соответствующие возможностям ассистента.** 
 
Предоставьте категории в виде JSON-массива строк **без кодовых блоков или дополнительного текста**. 
 
**Информация об ассистенте:** 
- **Имя**: {name} 
- **Описание**: {description} 
- **Инструкции**: {instructions} 
"""

PERSONA_STARTER_MESSAGE_CREATION_PROMPT = """
Создайте стартовое сообщение, которое **пользователь** может отправить для начала диалога с чат-ассистентом. 
 
{category_prompt} 
 
Ваш ответ должен содержать только **само сообщение пользователя**. 
Сообщение должно быть естественным, вовлекающим и стимулировать полезный ответ ассистента. 
**Избегайте излишне специфических деталей; оставляйте сообщение общим и применимым в широком контексте.** 
 
Пример: 
- Вместо: "Я только что взял 6-месячного лабрадора, который тянет поводок," 
напишите: "У меня проблемы с дрессировкой щенка, чтобы он спокойно ходил на поводке." 
 
Не добавляйте никаких пояснений, будьте максимально краткими. 
 
**Информация об ассистенте:** 
- **Имя**: {name} 
- **Описание**: {description} 
- **Инструкции**: {instructions} 
""".strip()


def format_persona_starter_message_prompt(
    name: str, description: str, instructions: str, category: str | None = None
) -> str:
    category_prompt = f"**Category**: {category}" if category else ""
    return PERSONA_STARTER_MESSAGE_CREATION_PROMPT.format(
        category_prompt=category_prompt,
        name=name,
        description=description,
        instructions=instructions,
    )


if __name__ == "__main__":
    print(PERSONA_CATEGORY_GENERATION_PROMPT)
    print(PERSONA_STARTER_MESSAGE_CREATION_PROMPT)
