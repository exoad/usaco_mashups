import random
import re
import string


class OwO_Conf:
    STUTTER_CHANCE = 0.2
    EMOTICON_CHANCE = 0.01
    EMOTICON_UTF8_CHANCE = EMOTICON_CHANCE if 'utf8' in string.punctuation else 0
    EXPRESS_CHANCE = 0.1
    PUNCTUATION_CHANCE = 0.02
    PUNCTUATION_CHANCE_MULTIPLIER = 0.1
    PUNCTUATION_MAXIM = 4
    ALTER_CHANCE = 1.0
    RNG = random.Random(392832903)

    _EMOTICONS_ = [
        "UwU",
        "OwO",
        ">w<",
        "Ow<",
        ">wO",
        ">3<",
        "TwT",
        "-w-",
        ";w;",
        ":3",
        ":v",
    ]

    _EMOTICONS_UTF8_ = [
        "·\\\\·",
        "ÒwÓ"
    ]

    _EXPRESS_EXTRA_ = [
        "hugs you",
        "winks",
        "wink wink",
        "\"senpai!\"",
        "\"baka!!\"",
        "kawaii",
        "<3"
    ]

    _EXPRESS_ = [
        "nuzzles",
        "meow",
        "nya",
        "nyea",
        "blushes"
    ]

    _DYN_ = [
        "purr>r>-",
        "rawr>r>-",
    ]

    _COMMONS_ = [
        ["r", "w"],
        ["R", "W"],
        ["l", "w"],
        ["L", "W"],
        ["/ove/g", "uv"],
        ["/nd(?= |$)/g", "ndo"],
        ["/n([aeiou])/g", "ny$1"],
        ["/N([aeiou])|N([AEIOU])/g", "Ny$1"]
        ["oo", "u"]
    ]

def roll(chance_percent):
      return OwO_Conf.RNG.random() <= chance_percent


def roll_func(res, default, chance_percent):
    return res() if roll(chance_percent) else default


def stut(word):
    length = len(word)
    if length <= 1:
        return word
    stutter_count = 1 if length == 2 else OwO_Conf.RNG.randint(1, 2)
    result = (word[:2] + '-') * (stutter_count - 1) + \
        word[:(2 * stutter_count - 1)]
    return result + word[2:]


def copy(seq, sep, n):
    return (seq + sep) * n if n > 0 else ""


def dynm():
    t = OwO_Conf._DYN_[OwO_Conf.RNG.randint(0, len(OwO_Conf._DYN_) - 1)]
    return t.split(">")[0] + ('' if roll(0.5) else copy(t.split(">")[1], t.split(">")[2], OwO_Conf.RNG.randint(0, 2)))


def expr():
    x = "(" if roll_func(lambda: '(', '', 0.5) else ''
    content = OwO_Conf._EXPRESS_EXTRA_[OwO_Conf.RNG.randint(0, len(OwO_Conf._EXPRESS_EXTRA_) - 1)] \
        if OwO_Conf.RNG.random() < 0.5 else OwO_Conf._EXPRESS_[OwO_Conf.RNG.randint(0, len(OwO_Conf._EXPRESS_) - 1)] \
        if OwO_Conf.RNG.random() < 0.5 else dynm()
    if OwO_Conf.RNG.random() < 0.5:
        content += OwO_Conf.EXPRESS_EXTRA[OwO_Conf.RNG.randint(
            0, len(OwO_Conf.EXPRESS_EXTRA) - 1)]
    else:
        content += OwO_Conf.EXPRESS[OwO_Conf.RNG.randint(
            0, len(OwO_Conf.EXPRESS) - 1)]

    if roll_func(lambda: ')', '', 0.5):
        x += content + ')'
    else:
        x += content

def emot():
    return random.choice(OwO_Conf._EMOTICONS_)

def owoify(context):

    sb = []

    for word in context.split():
        if roll(OwO_Conf.ALTER_CHANCE):
            for reg in OwO_Conf._COMMONS_:
                word = re.sub(reg[0], reg[1], word)
            if roll(OwO_Conf.STUTTER_CHANCE):
                word = stut(word)
            if roll(OwO_Conf.EMOTICON_CHANCE):
                word = word + " " + emot() if roll(0.5) else emot() + " " + word
            if roll(OwO_Conf.EXPRESS_CHANCE):
                word = word + " " + expr() if roll(0.5) else expr() + " " + word
            if roll(OwO_Conf.PUNCTUATION_CHANCE):
                j = 0
                e = random.choice(OwO_Conf._PUNCTUATION_)
                while roll(OwO_Conf.PUNCTUATION_CHANCE_MULTIPLIER) and j <= OwO_Conf.PUNCTUATION_MAXIM:
                    word += e
                    j += 1
        sb.append(word)

    return " ".join(sb)


print(owoify("Hello world!"))
