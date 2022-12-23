const router = require('express').Router();
const StatController = require('./statistication.controller');

router.get('/total-users', StatController.calculateDataOfUser);
router.get('/total-posts', StatController.calculateDataOfPost);
router.get('/top-users-by-view-count', StatController.getTopUsersByViewCount);
router.get('/top-users-by-follower-count', StatController.getTopUsersByFollowerCount);
router.get('/top-users-with-most-posts', StatController.getTopUserWithTheMostPosts);
router.get('/sys-stats', StatController.getAllStatsInfoOfSys);

module.exports = router;
