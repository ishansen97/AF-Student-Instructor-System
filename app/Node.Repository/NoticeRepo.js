const mongoose = require('../Node.Schema/InstructorSchema');
mongoose.set('useFindAndModify', false);
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

    this.getNoticesByName = (course) => {
        return new Promise((resolve, reject) => {
            noticesSchema.find({courses: course}).then((data) => {
                resolve({status: 200, message: data});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };

    this.updateNotice = (notice) =>{
        return new Promise((resolve, reject) => {
            noticesSchema.findOneAndUpdate(
                    {_id:notice.id},
                    {topic : notice.topic,
                    description:notice.description,
                    date:notice.date})
                .then(() => {
                resolve({status: 200, notice: "record updated"});
            }).catch(err => {
                reject({status: 500, message: err});
            })
        })
    };

    this.deleteNotice = (notice)=>{
        return new Promise((resolve, reject) => {
            noticesSchema.findOneAndRemove(
                {_id:notice.id})
        });
    }

};


module.exports = new NoticeRepo();