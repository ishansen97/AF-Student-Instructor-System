const mongoose = require('../Node.Schema/InstructorSchema');
const noticesSchema = mongoose.model('notices');

const NoticeRepo = function () {
    this.insterNotices = (notice) => {
        return new Promise((resolve, reject) => {
            const newNotice = new noticesSchema({
                topic: notice.topic,
                description: notice.description,
                date: notice.date,
                courses: notice.course
            });
            newNotice.save().then(() => {
                resolve({status: 200, message: 'notice added'});
            }).catch(err => {
                reject({status: 500, message: 'Error: ' + err})
            })
        })
    };

    this.getNotices = () => {
        return new Promise((resolve, reject) => {
            noticesSchema.find().exec().then((data) => {
                resolve({status: 200, courses: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };


    this.getNoticesById = (notice) => {
        return new Promise((resolve, reject) => {
            noticesSchema.find({id}).populate('notice').then((data) => {
                resolve({status: 200, notice: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })

    };
};


module.exports = new NoticeRepo();