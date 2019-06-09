# June 2019 Coding Challenge

## Usage

`node ./src/index.js <alias>`

Replace `<alias>` with the alias you'd like to use for this secret.

**NOTE**: Alias names are only stored in hashed form and passwords are never stored
so you can never retrieve them. This also means that multiple values can be stored
for the same alias with different passwords.

## Code Golf

The challenge is to accept an alias, password, and String and store that string for
later retrieval via the alias if the password matches.

It comes from the [Code Golf Stack Exchange](https://codegolf.stackexchange.com/) site,
specifically the following question:

[https://codegolf.stackexchange.com/q/185688](https://codegolf.stackexchange.com/q/185688)

## Notes

My current solution is in `src/index.js` and has not been golfed yet, so it is currently
`3.65kb`.

This solution encrypts the data at rest in a `~/.secrets` file and hashes each secret's
alias so that they are not exposed when attempting to view the `~/.secrets` file.

It currently suffers from a serious flaw where the user has to provide the secret's
password and text when calling the function to store the password. I need to adjust
it so that these arguments are provided in a more ephemeral way.

It will use the `SECRETS_SALT` environment variable if it exists when hashing aliases.
