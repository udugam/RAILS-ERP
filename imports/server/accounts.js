Accounts.onCreateUser((options, user) => {

if(Meteor.settings.admins.indexOf(options.email) > -1 ) {
  user.roles = ['admin'];
}
  user.status = 'pending';

  return user;
})
