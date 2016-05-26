'use strict';

import mongoose from 'mongoose';

var SpotifySongSubmissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  songId: String,
  active: Boolean
});

export default mongoose.model('SpotifySongSubmission', SpotifySongSubmissionSchema);
