import responseCode from '../constants/response/responseCode.js'
import responseStatus from '../constants/response/responseStatus.js'

export default {
  success: (data = {}) => ({
    status: responseStatus.success,
    code: responseCode.success,
    message: data.message || 'Request is successfully executed',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  failure: (data = {}) => ({
    status: responseStatus.failure,
    code: responseCode.notFound,
    message: data.message || 'Error occurred while performing action.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  internalServerError: (data = {}) => ({
    status: responseStatus.serverError,
    code: responseCode.internalServerError,
    message: data.message || 'Internal server error.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  badRequest: (data = {}) => ({
    status: responseStatus.badRequest,
    code: responseCode.badRequest,
    message: data.message || 'Request parameters are invalid or missing.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  recordNotFound: (data = {}) => ({
    status: responseStatus.recordNotFound,
    code: responseCode.notFound,
    message: data.message || 'Record not found with specified criteria.',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  validationError: (data = {}) => ({
    status: responseStatus.validationError,
    code: responseCode.validationError,
    message: data.message || `Invalid Data, Validation Failed.`,
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),

  unAuthorized: (data = {}) => ({
    status: responseStatus.unauthorized,
    code: responseCode.unAuthorized,
    message: data.message || 'Not authorized to access the request',
    data: data.data && Object.keys(data.data).length ? data.data : null,
  }),
}
