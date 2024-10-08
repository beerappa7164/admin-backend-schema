



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  firstName: { type: String, minlength: 4 },
  lastName: { type: String,  minlength: 4 },
  email: { type: String,  unique: true, lowercase: true },
  password: { type: String,  minlength: 8 },
  
  phoneNo: { type: String, minlength: 10},
  location: { type: String },
  photoUrl: { type: String,default:'https://res.cloudinary.com/di8docqfs/image/upload/v1724652624/orman_a893tq.jpg'},
  role: { type: String, default: 'student' },
  aboutMe: { type: String, default: 'null' },
  education: { type: String, default: 'null'},
  
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, { versionKey: false, timestamps: true });

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

studentSchema.pre('findOneAndUpdate', async function(next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
