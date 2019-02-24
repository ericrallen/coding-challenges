# February 2019 Coding Challenge

## Code Golf

The challenge is to return the [NATO Phonetic Alphabet](http://spellout.org/alphabetInfo?alphabet=en-nato)
representation of a provided string ignoring spaces.

It comes from the [Code Golf Stack Exchange](https://codegolf.stackexchange.com/) site,
specifically the following question:

[https://codegolf.stackexchange.com/questions/178376/write-a-function-method-that-takes-in-a-string-and-spells-that-word-out-using-th](https://codegolf.stackexchange.com/questions/178376/write-a-function-method-that-takes-in-a-string-and-spells-that-word-out-using-th)

## Notes

My current solution is `288 bytes`.

It's worth noting that I changed the incorrect `Alfa` in the
question to the proper `Alpha` and the incorrect `Juliett` to
 `Juliet`, which should result in the same initial byte length.

 Given the "only letters and spaces" note in the question, this implementation is very naive and does not include any handling for numbers or special characters.
