import json
import openai

openai.api_key = "sk-yAdnm9P4fUAqDWWr3qMgoR3kZ7Px2q3qskzplmwx"


def handler(event, context):
    text = event['arguments']['text']
    response = openai.Completion.create(
        engine="davinci",
        prompt=text,
        temperature=0.3,
        max_tokens=60,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0
    )

    return json.dumps(response)
