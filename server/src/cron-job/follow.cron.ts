import cron from 'node-cron';

// run every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  try {
    await deleteOldDeclinedRequest();
  } catch (err) {
    const errorMessage = err instanceof Error 
          ? ` ${err.message}` 
          : String(err);
    console.error('[CRON] error:', errorMessage);
  }
});