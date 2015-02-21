import Ember from 'ember';
import config from '../config/environment';

import ajax from '../utils/ajax';

let apiURL = config.apiURL;

export default Ember.Component.extend({
  emblem: null,
  compiled: null,
  loading: false,
  error: false,

  compileEmblem: function(){
    let component = this;
    let emblem = this.get('emblem');

    if (!emblem) { return; }
    if (this.get('loading')) { return; }

    this.setProperties({
      compiled: null,
      loading: true,
      error: false
    });

    return ajax(apiURL, {type: 'POST', data: {emblem}}).then(function(result){
      let compiled = result.compiled;
      compiled.replace(/</g, '&gt;').
               replace(/>/g, '&lt;');
      component.set('compiled', compiled);
    }).catch(function(e){
      if (e.status === 422) {
        component.set('error', e.responseJSON.message);
      } else {
        component.set('error', e.message);
      }
    }).finally(function(){
      component.set('loading', false);
    });
  }.observes('emblem')
});
