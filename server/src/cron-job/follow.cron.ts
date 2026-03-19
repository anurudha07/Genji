import cron from 'node-cron';
import { deleteOldDeclinedRequest } from '../service/cron.service';

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