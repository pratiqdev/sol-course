# TODO

# 1 - Question validation and feedback setup

- setup q&a validation
- show feedback on incorrect answers (after submission)
- tally and display score
- store answers in mongo (on submission)
- fetch answers from mongo (if already submitted)
- disable submit button if submitted already and no new changes to save


# 2 - Course completion status

> requires connection to mongo

track addresses and their completion status for a course. Object will not 
contain a course key if the course has not been started.

```js
progressObject = {
  '0x1324':{
    'intro':{
      'page-1':{
        progress: 100,
        score: 100, // score of -1 means not started
      },
      'page-2':{
        progress: 100,
        score: 100
      }
    },
    'section-1':{
      'course-1':{ // editor / compilation based
        progress: 100,
        score: 95, // passed? there will probably be a case where minimum score 
        // can be used to pass/fail a user
        code: '// code written by user'
      },
      'course-2':{
        progress: 0,
        score: -1,
      }
    },

  }
}
```
