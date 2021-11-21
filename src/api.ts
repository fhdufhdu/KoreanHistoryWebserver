export const MethodInfo = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const ApiInfo = {
  requestPromise: require('request-promise'),
  PYTHON_URI: 'http://202.31.202.147:5000/',
  DB_URI: '',
  RequestType: {
    QnA: 1,
    FIND_DOC: 2,
    DELETE_QUIZ: 3,
    REQUEST_QUIZ: 4,
    MODIFIED_QUIZ: 5,
    INSERT_QUIZ: 6,
  },
  FindType: {
    TITLE: 'title',
    SEARCH: 'search',
    ALL: '',
  },
  getRequestOption: (method: string, uri: string, data) => {
    const option = {
      uri: uri,
      method: method,
      json: true,
    };

    if (data.qs != undefined) {
      option['qs'] = data.qs;
    }
    if (data.body != undefined) {
      option['body'] = data.body;
    }

    console.log(option);

    return option;
  },
  getUri: function (requestType: number, option) {
    const type = this.RequestType;
    switch (requestType) {
      case type.QnA:
        return this.PYTHON_URI + 'qna';
      case type.FIND_DOC:
        return this.DB_URI + `dict/${option.type}`;
      case type.DELETE_QUIZ:
        return this.DB_URI + `quiz/${option.id}`;
      case type.REQUEST_QUIZ:
      case type.MODIFIED_QUIZ:
      case type.INSERT_QUIZ:
        return this.DB_URI + `quiz`;
    }
  },
  request: async function (requestType: number, data) {
    let result = null;
    let request_option = null;
    const type = this.RequestType;
    switch (requestType) {
      //QnA 요청일 때
      case type.QnA:
        console.log(data);
        request_option = this.getRequestOption(
          'POST',
          this.getUri(requestType, data),
          data,
        );
        break;

      //문서 찾기 요청일 때
      case type.FIND_DOC:
        request_option = this.getRequestOption(
          'GET',
          this.getUri(requestType, data),
          data,
        );
        break;

      //퀴즈 삭제 요청일때
      case type.DELETE_QUIZ:
        request_option = this.getRequestOption(
          'DELETE',
          this.getUri(requestType, data),
          data,
        );
        break;

      //Quiz 요청일 때
      case type.REQUEST_QUIZ:
        request_option = this.getRequestOption(
          'GET',
          this.getUri(requestType, data),
          data,
        );
        break;

      //Quiz 수정 요청일 때
      case type.MODIFIED_QUIZ:
        request_option = this.getRequestOption(
          'PUT',
          this.getUri(requestType, data),
          data,
        );
        break;

      //Quiz 삽입 요청일 때
      case type.INSERT_QUIZ:
        request_option = this.getRequestOption(
          'POST',
          this.getUri(requestType, data),
          data,
        );
        break;
    }
    await this.requestPromise(request_option, async (err, res, body) => {
      result = body;
    });
    return result;
  },
};
