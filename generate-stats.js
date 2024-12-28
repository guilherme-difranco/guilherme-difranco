const puppeteer = require('puppeteer');
const fs = require('fs');

const username = process.env.USERNAME;
const token = process.env.GH_TOKEN;

const statsUrls = [
  `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&count_private=true&include_all_commits=true`,
  `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&count_private=true`,
  `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark`
];

const outputFiles = ['github-stats.svg', 'top-langs.svg', 'activity-graph.svg'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < statsUrls.length; i++) {
    const url = statsUrls[i];
    const output = outputFiles[i];

    // Adiciona o token de autenticação na URL
    const authUrl = `${url}&access_token=${token}`;

    await page.goto(authUrl, { waitUntil: 'networkidle2' });
    const svg = await page.content();

    // Salva o conteúdo SVG no arquivo correspondente
    fs.writeFileSync(output, svg);
  }

  await browser.close();
})();
