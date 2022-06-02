import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    sessionId:      { type: 'string' },
    user:           { type: 'string' },
    subject:        { type: 'string' },
    notes:          { type: 'string' },
    
    active:         { type: 'boolean', default: false },
    start:          { type: 'number', default: 0 },
    end:            { type: 'number', default: 0 },
    dur:            { type: 'number', default: 0 },
    
    startString:    { type: 'string' },
    endString:      { type: 'string' },
})

export default mongoose.model('sessions', schema, 'sessions') // second 'session' ensures that mongo does not attempt to make it plural => 'sessionss'