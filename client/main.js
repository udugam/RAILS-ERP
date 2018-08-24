import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import {render} from 'react-dom';
import '../imports/client/routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { facoffee } from '@fortawesome/free-solid-svg-icons'

library.add(facoffee)