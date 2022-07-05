from random import choice

ALPHABET = "".join([chr(ord('a') + i) for i in range(26)])
ALPHABET = ALPHABET + ALPHABET.upper()
ALPHABET += '1234567890'

def get_id() -> str:
    return "".join([choice(ALPHABET) for i in range(20)])