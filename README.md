![Demo](https://i.imgur.com/6P52E7n.gif)

Talent Hub is a tool intended for use by developers looking for like-minded individuals to collaborate with on open-source projects.

GitHub does not provide user's with a means of communication. This tool is an attempt to connect developers using the platform and encourage collaboration.

This tool will allow you to retrieve a user's e-mail address if it is not present on their profile page.

## Setup

#### 1. Clone the repository
```
git clone https://github.com/nickbetsworth/TalentHub.git
```

#### 2. Install dependencies
```
npm install
```
in both `server` and `frontend` directories

#### 3. Set your GitHub API access token
Set your access token in `/server/.env`:
```
GITHUB_ACCESS_TOKEN=...
```

The access token does not require any permissions to be set.

Read [here](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) for instructions on how to create an access token.

#### 4. Run

```
npm run --prefix server start
npm run --prefix frontend serve
```

Visit http://localhost:8080/ to use the service.

## Disclaimer
This tool is **not** to be used for the purpose of recruitment, marketing, headhunting, spamming, or sale of a user's personal data.

There is no guarantee that the e-mail address retrieved, if absent from the user's profile page, is correct. This tool makes an educated guess from the user's history.

## Future Work
- Extract contact details for any given user
- Add filter by language
