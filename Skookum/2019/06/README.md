# June 2019 Coding Challenge

## Code Golf

The challenge is to accept an alias, password, and String and store that string for
later retrieval via the alias if the password matches.

It comes from the [Code Golf Stack Exchange](https://codegolf.stackexchange.com/) site,
specifically the following question:

[https://codegolf.stackexchange.com/q/185688](https://codegolf.stackexchange.com/q/185688)

## Notes

My current solution is in `src/index.js` and has not been golfed yet, so it is currently
too many bytes to worry about counting them.

This solution encrypts the data at rest in a `~/.secrets` file and hashes each secret's
alias so that they are not exposed when attempting to view the `~/.secrets` file.

It currently suffers from a serious flaw where the user has to provide the secret's
password and text when calling the function to store the password. I need to adjust
it so that these arguments are provided in a more ephemeral way.

It will use the `SECRETS_SALT` environment variable if it exists when hashing aliases.
