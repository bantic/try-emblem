import Ember from 'ember';
import Emblem from 'emblem';

export default Ember.Component.extend({
  emblem: null,
  compiled: null,
  error: false,

  compileEmblem: function(){
    let component = this;
    let emblem = this.get('emblem');

    if (!emblem) { return; }
    if (this.get('loading')) { return; }

    this.setProperties({
      compiled: null,
      error: false
    });

    return Ember.RSVP.resolve().then( () => {
      let compiled = Emblem.compile(emblem);
      compiled.replace(/</g, '&gt;').
               replace(/>/g, '&lt;');
      component.set('compiled', compiled);
    }).catch(function(e){
      if (e.status === 422) {
        component.set('error', e.responseJSON.message);
      } else {
        component.set('error', e.message);
      }
    });
  }.observes('emblem')
});
