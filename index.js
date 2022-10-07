const core = require('@actions/core');
const fetch = require('node-fetch');

const main = async () => {
  try {
    const VERCEL_ACCESS_TOKEN = core.getInput('VERCEL_ACCESS_TOKEN', { required: true });
    const VERCEL_TEAM_ID = core.getInput('VERCEL_TEAM_ID', { required: true });
    const VERCEL_PROJECT_ID = core.getInput('VERCEL_PROJECT_ID', { required: true });
    const CLEANUP_DATE = core.getInput('CLEANUP_DATE', { required: true });

    const request = await fetch(
      `https://api.vercel.com/v6/deployments?teamId=${VERCEL_TEAM_ID}&projectId=${VERCEL_PROJECT_ID}&target=preview&until=${CLEANUP_DATE}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VERCEL_ACCESS_TOKEN}`,
        },
      }
    );

    const { deployments } = await request.json();

    for await (const deployment of deployments) {
      // const req = await fetch(`https://api.vercel.com/v13/deployments/${deployment.uid}`, {
      //   method: 'GET',
      //   headers: {
      //     Authorization: `Bearer ${VERCEL_ACCESS_TOKEN}`,
      //   },
      // });

      // const response = await req.json();

      console.log('DELETE DEPLOYMENT ID: ', deployment.uid);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
