import AWSXRay from 'aws-xray-sdk-core';

AWSXRay.capturePromise()
// Makes sure that this function is not called again.
// It would wrap the promise prototype multiple times.
AWSXRay.capturePromise = function () {}

export function captureAsyncFunc (name, func) {
  return new Promise(function (resolve, reject) {
    AWSXRay.captureAsyncFunc(name, segment => {
      func(segment).then(
        (result) => {
          segment.close()
          resolve(result)
        },
        (error) => {
          segment.close(error)
          reject(error)
        }
      )
    })
  })
};
