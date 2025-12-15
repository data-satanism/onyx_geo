# The following prompts are used for verifying the LLM answer after it is already produced.
# Reflexion flow essentially. This feature can be toggled on/off
from onyx.configs.app_configs import CUSTOM_ANSWER_VALIDITY_CONDITIONS
from onyx.prompts.constants import ANSWER_PAT
from onyx.prompts.constants import QUESTION_PAT

ANSWER_VALIDITY_CONDITIONS = (
"""
1. Ответ содержит субъективные, оценочные или персонально-зависимые утверждения (мнения, инвестиционные советы, оптимистичные прогнозы), \
   для которых не существует универсально корректного аналитического вывода. В таком случае ответ считается недопустимым. 
2. Ответ формально связан с темой запроса, но фактически отвечает на другой вопрос \
   (например, описывает общую геологию вместо оценки данных, либо экономику без геологических оснований). 
3. Ответ заявляет экономические выводы или перспективы без опоры на фактические геологические данные, \
   категории ресурсов или соответствие международным стандартам (JORC / NI 43-101 / SAMREC). 
"""
    if not CUSTOM_ANSWER_VALIDITY_CONDITIONS
    else "\n".join(
        [
            f"{indice+1}. {condition}"
            for indice, condition in enumerate(CUSTOM_ANSWER_VALIDITY_CONDITIONS)
        ]
    )
)

ANSWER_FORMAT = (
"""
1. True or False
2. True or False
3. True or False
"""
    if not CUSTOM_ANSWER_VALIDITY_CONDITIONS
    else "\n".join(
        [
            f"{indice+1}. True or False"
            for indice, _ in enumerate(CUSTOM_ANSWER_VALIDITY_CONDITIONS)
        ]
    )
)

ANSWER_VALIDITY_PROMPT = f"""
Ты — аналитический ассистент для выявления некорректных пар вопрос–ответ, \
сгенерированных языковой моделью в геолого-экономическом домене. 
 
Пара вопрос–ответ считается НЕДОПУСТИМОЙ, если ЛЮБОЕ из следующих утверждений истинно: 
{ANSWER_VALIDITY_CONDITIONS} 
 
{QUESTION_PAT} {{user_query}} 
{ANSWER_PAT} {{llm_answer}} 
 
------------------------
ТРЕБОВАНИЯ К ОЦЕНКЕ: 
— Корректное указание отсутствия данных, неопределённости или невозможности экономической оценки \
  НЕ является ошибкой и НЕ делает ответ недопустимым. 
— Ответ считается недопустимым, если неопределённость маскируется, \
  либо заменяется логическими или рыночными предположениями. 
— Экономические выводы без геологических оснований автоматически считаются нарушением. 
 
Ты ОБЯЗАН ответить СТРОГО в следующем формате: 
```
{ANSWER_FORMAT}
Final Answer: valid or invalid
``` 
Подсказка: если ХОТЯ БЫ ОДНО из условий истинно — итог всегда invalid. 
""".strip()


# Use the following for easy viewing of prompts
if __name__ == "__main__":
    print(ANSWER_VALIDITY_PROMPT)