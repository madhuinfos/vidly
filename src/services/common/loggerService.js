import Raven from "raven-js";

function init() {
  Raven.config(
    "https://3d87fe78f37146eab5e844922bf6c4ca@o403294.ingest.sentry.io/5267223",
    { release: "vidly@1.0" }
  ).install();
}

function logError(err) {
  Raven.captureException(err);
}

export default {
  init,
  logError,
};
