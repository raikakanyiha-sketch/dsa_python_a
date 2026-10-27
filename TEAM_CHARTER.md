# Team Charter: Prestige

## Team and starting roles

Roles rotate every 4 weeks. Fill in who holds each one.

| Member | Starting role |
|---|---|
| Shannel Wanjiru | [API Lead / Backend Dev / Integration-QA Lead / Docs-DevOps Lead] |
| Raika Kanyiha | [role] |
| GuyTresor Gacheru | [role] |
| Tony Kibe | [role] |

Role descriptions: **API Lead** makes endpoint and contract decisions. **Backend Dev(s)** build endpoints and database logic. **Integration/QA Lead** owns testing, including testing partner teams' APIs. **Docs/DevOps Lead** owns the README, environment setup and deployment.

## Our app

Campus Lost and Found is a student-focused platform that helps students recover lost belongings within their school community. Students register and log in to their school's portal, browse and search found items, report items they have found, and submit ownership claims with supporting evidence. The student who found an item reviews the claims and selects the rightful owner. Students can also manage their claims, view the items they posted, receive notifications, edit their profile, and switch to dark mode. It is for students at participating schools.

## Audit: what the app stores

- Students (ID, name, email, phone, school, login details)
- Schools and their portals
- Found items (title, description, category, where and when found, status)
- Item photos
- Ownership claims, with claim evidence and claim status
- Fees on approved claims, and refunds of those fees
- Notifications
- Each student's posted items
- Profile information, including the dark mode setting
- Authentication and session information

## Audit: what a user can do

- Register, log in, log out
- Enter their school portal
- Browse found items
- Search and filter items
- Report a found item, with a photo
- Submit an ownership claim, with evidence
- View their claims, and withdraw a pending one
- View the items they posted, and remove one
- Review the claims on an item they found
- Select the legitimate owner (approve one claim, decline the others)
- View notifications and mark them read
- View and edit their profile, change their password
- Toggle dark mode

## Ring position

| | Team |
|---|---|
| Upstream partner (we consume their API) | [team name], [what their app does] |
| Downstream partner (they consume our API) | [team name], [what their app does] |
