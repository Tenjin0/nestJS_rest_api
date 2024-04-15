import { error_messages } from './errorCode'

export default class CustomError extends Error {
	status: number
	error_code: string
	errors: any
	data: any

	static CODE = {
		BASIC_AUTH_VALIDATION_FAILED: 'BASIC_AUTH_VALIDATION_FAILED',
		GENERIC: 'INTERNAL_ERROR',
		REMOTE_$$: 'REMOTE_$$',
		APP_NOT_INITIALIZED: 'APP_NOT_INITIALIZED',
		SERVICE_NOT_STARTED: 'SERVICE_NOT_STARTED',
		SERVICE_DB: 'SERVICE_DB',
		SERVICE_$$_NOT_AVAILABLE: 'SERVICE_$$_NOT_AVAILABLE',

		CHANGE_$$_CONTROLER: 'CHANGE_$$_CONTROLER',

		INVALID_PARAMETERS: 'INVALID_PARAMETERS',
		MISSING_PARAMETER: 'MISSING_PARAMETER',
		$$_UNAUTHORIZED_$$: '$$_UNAUTHORIZED_$$',
		$$_NOT_AUTHORIZED: '$$_NOT_AUTHORIZED',
		INVALID_TYPE_PARAMETER: 'INVALID_TYPE_PARAMETER',
		INVALID_FORMAT_PARAMETER: 'INVALID_FORMAT_PARAMETER',
		OUT_OF_RANGE_PARAMETER: 'OUT_OF_RANGE_PARAMETER',
		INVALID_FORMAT_UPPERCASE_PARAMETER: 'INVALID_FORMAT_UPPERCASE_PARAMETER',
		INVALID_FORMAT_DIGIT_PARAMETER: 'INVALID_FORMAT_DIGIT_PARAMETER',
		INVALID_LENGTH_PARAMETER_FORMAT: 'INVALID_LENGTH_PARAMETER_FORMAT',
		INVALID_FORMAT_EQUAL_PARAMETER: 'INVALID_FORMAT_EQUAL_PARAMETER',
		INVALID_PATTERN_PARAMETER: 'INVALID_PATTERN_PARAMETER',
		INVALID_EMPTY_FORMAT: 'INVALID_EMPTY_FORMAT',
		INVALID_PARAMETER_VALUE: 'INVALID_PARAMETER_VALUE',
		INVALID_$$_VALUE: 'INVALID_$$_VALUE',
		INVALID_$$_STATUS: 'INVALID_$$_STATUS',

		NO_SERVER_HTTP_ATTACH: 'NO_SERVER_HTTP_ATTACH',

		DEVICE_NOT_INITIALIZED: 'DEVICE_NOT_INITIALIZED',

		ILLEGAL_LEADING_TRAILING_CHARACTERS: 'ILLEGAL_LEADING_TRAILING_CHARACTERS',
		$$_ALREADY_EXIST: '$$_ALREADY_EXIST',
		$$_ALREADY_DELETED: '$$_ALREADY_DELETED',
		$$_ALREADY_ACTIVATED: '$$_ALREADY_ACTIVATED',
		$$_ALREADY_EXECUTED: '$$_ALREADY_EXECUTED',
		$$_ALREADY_EXECUTING: '$$_ALREADY_EXECUTING',
		$$_NOT_EXECUTING: '$$_NOT_EXECUTING',
		$$_NOT_FOUND: '$$_NOT_FOUND',
		$$_NOT_ACTIVATED: '$$_NOT_ACTIVATED',
		$$_IGNORED: '$$_IGNORED',
		$$_OUT_OF_RANGE_PARAMETER: '$$_OUT_OF_RANGE_PARAMETER',
		VALUES_ALREADY_EXIST: 'VALUES_ALREADY_EXIST',
		EXCLUSIVE_PARAMETER: 'EXCLUSIVE_PARAMETER',
		NO_SOCKET_ID: 'NO_SOCKET_ID',
		DUPLICATE_EVENT: 'DUPLICATE_EVENT',
		DUPLICATE_EVENTS_SUBSCRIBTION: 'DUPLICATE_EVENTS_SUBSCRIBTION',
		DUPLICATE_KEYS: 'DUPLICATE_KEYS',
		DUPLICATE_KEY_$$: 'DUPLICATE_KEY_$$',

		NO_EVENTS_SUBSCRIBTION: 'NO_EVENTS_SUBSCRIBTION',
		NO_EVENT_FOUND: 'EVENT_NOT_FOUND',
		NO_CONTROLLER_FOUND: 'CONTROLLER_NOT_FOUND',
		NO_COMMAND_FOUND: 'COMMAND_NOT_FOUND',
		NO_LOG_READERS_FOUND: 'NO_LOG_READERS_FOUND',
		DEVICE_NOT_CONNECTED: 'DEVICE_NOT_CONNECTED',
		INVALID_DEVICE_$$: 'INVALID_DEVICE_$$',
		$$_NOT_CONNECTED: '$$_NOT_CONNECTED',
		NO_UPDATE_CHANGE: 'NO_UPDATE_CHANGE',
		PAGE_OUT_OF_RANGE: 'PAGE_OUT_OF_RANGE',
		QUERY_FIELDS_EMPTY: 'QUERY_FIELDS_EMPTY',
		NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
		REQUEST_TO_DEVICE: 'REQUEST_TO_DEVICE',
		DISCONNECTED_DEVICE: 'DISCONNECTED_DEVICE',

		MISSING_ACCESS_TOKEN: 'MISSING_ACCESS_TOKEN',
		INVALID_ACCESS_TOKEN: 'INVALID_ACCESS_TOKEN',
		ACCESS_TOKEN_ERROR: 'ACCESS_TOKEN_ERROR',
		INVALID_REFRESH_TOKEN: 'INVALID_REFRESH_TOKEN',
		ACCESS_TOKEN_EXPIRED: 'ACCESS_TOKEN_EXPIRED',
		REFRESH_TOKEN_EXPIRED: 'REFRESH_TOKEN_EXPIRED',
		REFRESH_TOKEN_SALT_INVALID: 'REFRESH_TOKEN_SALT_INVALID',
		MISSING_BASIC_TOKEN: 'MISSING_BASIC_TOKEN',
		BASIC_TOKEN_ERROR: 'BASIC_TOKEN_ERROR',
		TIMEOUT_REQUEST: 'TIMEOUT_REQUEST',
		TIMEOUT_RESPONSE: 'TIMEOUT_RESPONSE',
		$$_DELETED: '$$_DELETED',
		$$_CONFLICT: '$$_CONFLICT',

		APPLICATION_NOT_REGISTERED: 'APPLICATION_NOT_REGISTERED',
	}

	static DEFAULT_MESSAGE = 'Something went wrong'

	/**
	 *
	 * @param {integer} status http status code
	 * @param {string} code code error see CustomError.CODE
	 * @param {string} message message of the error
	 * @param {object} error_values to custom the code and message error
	 */

	constructor(
		status = 500,
		error_code = CustomError.CODE.GENERIC,
		message = CustomError.DEFAULT_MESSAGE,
		error_values = [],
	) {
		super(
			message ||
				(error_code && error_messages[error_code] ? error_messages[error_code] : CustomError.DEFAULT_MESSAGE),
		)

		this.status = status || 500
		this.error_code = error_code || CustomError.CODE.GENERIC
		this.errors = []
		this.data = null

		if (this.message && error_values) {
			for (let i = 0; i < error_values.length; i++) {
				this.message = this.message.replace(`$${i}`, function messageReplace(replace, ...others) {
					if (replace === `$${i}` && others && others[2]) {
						return others[2]
					}
					return error_values[i]
				})
				this.error_code = this.error_code.replace('$$', String(error_values[i]).toUpperCase())
			}
		}
	}

	toString() {
		return JSON.stringify(this.format())
	}

	format() {
		const format: any = {
			status: this.status,
			error_code: this.error_code ? this.error_code : CustomError.CODE.GENERIC,
			message: this.message,
		}
		if (this.errors.length) {
			format.errors = this.errors
		}
		if (this.data) {
			format.data = this.data
		}
		return format
	}

	addSubError(field, code, message, value) {
		const subError = CustomError.generateSubError(field, code, message, value)
		this.errors.push(subError)
	}

	static factory(err) {
		if (err instanceof CustomError) {
			return err
		}
		if (typeof err === 'string') {
			return new CustomError(500, null, err)
		}
		const ce = new CustomError(err.status || 500, err.error_code, err.message)

		if (err.status !== ce.status) {
			ce.status = err.status
		}
		if (err.data) {
			ce.data = err.data
		}

		return ce
	}

	static generateMessage(code, error_values) {
		let message = code && error_messages[code] ? error_messages[code] : CustomError.DEFAULT_MESSAGE
		if (message && error_values) {
			for (let i = 0; i < error_values.length; i++) {
				message = message.replace(/(\$[0-9])(\[(.+)\])?/, function replaceMessage(replace, ...other) {
					const k = Number.parseInt(replace[1], 10)
					if (!error_values[k] && other && other[2]) {
						return other[2]
					}
					return error_values[k] ? error_values[k] : error_values[i]
				})
			}
		}

		return message
	}

	static convertConstraintToCodeError(constraint) {
		switch (constraint) {
			case 'minLength':
				return CustomError.CODE.INVALID_LENGTH_PARAMETER_FORMAT
			case 'isNotEmpty':
				return CustomError.CODE.INVALID_EMPTY_FORMAT
			case 'CreateditentialsDto':
				return CustomError.CODE.BASIC_AUTH_VALIDATION_FAILED
			default:
				return CustomError.CODE.INVALID_PARAMETER_VALUE
		}
	}
	static generateSubError(field, subcodeRaw, message, value) {
		subcodeRaw = subcodeRaw || CustomError.CODE.GENERIC
		const subcode = subcodeRaw.replace('$$', String(field).toUpperCase())
		return {
			field,
			code: subcode,
			message: message || CustomError.generateMessage(subcodeRaw, [value]),
			value,
		}
	}

	setData(key, value) {
		if (!this.data) {
			this.data = {}
		}

		this.data[key] = value

		return this
	}

	convert(err) {
		const missingProperties = []
		for (const key in err.data) {
			const error = err.data[key][0]
			if (error.keyword === 'required' && error.params.missingProperty) {
				this.error_code = 'MISSING_KEYS'
				missingProperties.push(error.params.missingProperty)
				this.errors.push({
					field: error.params.missingProperty,
					code: `MISSING_KEY_${error.params.missingProperty.toUpperCase()}`,
					message: `${error.params.missingProperty} is a required property`,
				})
			}
		}
		if (missingProperties.length > 0 && missingProperties.length === 1) {
			this.message = `must have required property ${missingProperties[0]}`
		} else if (missingProperties.length > 0 && missingProperties.length > 1) {
			this.message = `must have required properties ${missingProperties.join(',')}`
		}
	}
}
