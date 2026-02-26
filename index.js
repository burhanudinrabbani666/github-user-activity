import { argv } from "node:process";

async function app() {
  try {
    const userName = argv.at(2);
    if (!userName)
      throw new Error(
        "Please provide a username. Usage: node app.js <username> OR npm start <username>",
      );

    const response = await fetch(
      `https://api.github.com/users/${userName}/events?per_page=30`,
    );

    if (response.status === 404) throw new Error("User Not Found");
    if (response.status === 403) throw new Error("API Rate Limit Exceeded");
    if (response.status === 422) throw new Error("Invalid Username");
    if (!response.ok)
      throw new Error(
        `Request Failed: ${response.status} ${response.statusText}`,
      );

    const dataUser = await response.json();

    const pushEvent = dataUser.filter((data) => data.type === "PushEvent");
    const notPush = dataUser.filter((data) => data.type !== "PushEvent");

    // Push Event
    const repoMap = {};
    pushEvent.forEach((repo) => {
      const repoName = repo.repo.name;

      if (repoMap[repoName]) {
        repoMap[repoName]++;
      } else {
        repoMap[repoName] = 1;
      }
    });

    const repoArray = Object.entries(repoMap);
    repoArray.forEach((repo) =>
      console.log(`🚀 pushed ${repo.at(1)} commits to ${repo.at(0)}`),
    );

    //  Other Event
    notPush.forEach((repo) => {
      const actor = repo.actor.login;
      const repoName = repo.repo.name;
      const action = repo.payload?.action;

      const eventMap = {
        CreateEvent: `✨ Created new repository ${repoName}`,
        DeleteEvent: `🗑️  Deleted repository ${repoName}`,
        ForkEvent: `🍴 ${actor} forked ${repoName}`,
        IssueCommentEvent: `💬 ${actor} commented on an issue in ${repoName}`,
        IssuesEvent: `🐛 ${actor} ${action} an issue in ${repoName}`,
        PullRequestEvent: `🔀 ${actor} ${action} a pull request in ${repoName}`,
        ReleaseEvent: `🚀 ${actor} published a new release in ${repoName}`,
        WatchEvent: `⭐ ${actor} starred ${repoName}`,
      };

      const textToRender =
        eventMap[repo.type] ??
        `📌 ${actor} triggered ${repo.type} on ${repoName}`;
      console.log(textToRender);
    });
  } catch (error) {
    console.log(`❌ error: ${error.message}`);
  }
}

app();
