package com.thiakil.com.thiakil.hudiy

import hudiy.app.api.HelloResponse

val HelloResponse.isOK: Boolean get() = result == HelloResponse.HelloResponseResult.HELLO_RESPONSE_RESULT_OK