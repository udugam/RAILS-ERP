Accounts.onCreateUser((options, user) => {

if(Meteor.settings.admins.indexOf(options.email) > -1 ) {
  user.roles = ['admin'];
}
if(Meteor.settings.purchasers.indexOf(options.email) > -1 ) {
  user.roles = ['purchaser'];
}
  user.status = 'pending';
  return user;
})
