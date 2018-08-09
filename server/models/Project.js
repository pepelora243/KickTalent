const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'A title is required']

  },
  description: {
    type: String,
    required: [true, 'A description must be provided']
  },
  profile: [],
  petitions: [{type: Schema.Types.ObjectId, ref: 'User'}],
  approved: [{type: Schema.Types.ObjectId, ref: 'User'}],
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  pic:{type:String,default:"http://mgainza.com/wp-content/uploads/2016/05/mainImage.jpg"}
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
