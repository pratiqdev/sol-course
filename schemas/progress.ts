import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    userAddress:    { type: 'string' },

    totalTime:      { type: 'string' },
    latestCourse:   { type: 'string' },
    latestCategory: { type: 'string' },

    progressObject: { type: 'object' },

})

export default mongoose?.models?.Progress || mongoose.model('Progress', schema, 'Progress') // second 'session' ensures that mongo does not attempt to make it plural => 'sessionss'