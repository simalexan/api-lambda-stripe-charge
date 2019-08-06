const AWSXRay = require('aws-xray-sdk-core');

AWSXRay.capturePromise()
// Makes sure that this function is not called again.
// It would wrap the promise prototype multiple times.
AWSXRay.capturePromise = function () {}

export function captureAsyncFunc (name: string, func: any) {
  return new Promise(function (resolve, reject) {
    AWSXRay.captureAsyncFunc(name, (segment: any) => {
      func(segment).then(
        (result: any) => {
          segment.close()
          resolve(result)
        },
        (error: any) => {
          segment.close(error)
          reject(error)
        }
      )
    })
  })
};
