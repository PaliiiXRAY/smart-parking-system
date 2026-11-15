const pool = require('./db');

/**
 * Releases expired reservation holds (slot freed by trigger) and marks
 * the booking payment as forfeited/expired in the ledger.
 */
async function cleanExpiredReservations(db = pool) {
  try {
    const res = await db.query(
      `WITH gone AS (
         DELETE FROM reservation
          WHERE expires_at < now()
          RETURNING txn_ref
       )
       UPDATE online_payment op
          SET status = 'EXPIRED'
         FROM gone
        WHERE op.txn_ref = gone.txn_ref
          AND op.status = 'PAID'`
    );
    return res.rowCount || 0;
  } catch (err) {
    console.error('Failed to clean expired reservations:', err.message);
    return 0;
  }
}

let timer = null;

/**
 * Starts a recurring background worker to clear expired slot reservations.
 * @param {number} intervalMs - interval between checks in milliseconds (default: 30s)
 */
function startReservationCleanup(intervalMs = 30000) {
  if (timer) return timer;
  cleanExpiredReservations();
  timer = setInterval(cleanExpiredReservations, intervalMs);
  if (timer.unref) {
    timer.unref();
  }
  return timer;
}

/**
 * Stops the background reservation cleanup worker.
 */
function stopReservationCleanup() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

module.exports = {
  cleanExpiredReservations,
  startReservationCleanup,
  stopReservationCleanup
};
