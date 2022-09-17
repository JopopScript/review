import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CustomValidateMessage } from "../custom-validate-message";
import { PagenationQueryDto } from "./pagenation-query.dto";

describe('PagenationQueryDto', () => {
  it('정상처리: Dto에 맞는 형식으로 모두 들어온 경우', async () => {
    //given
    const requestDto = {
      page: 13,
      pageSize: 20,
    };
    const requestDtoObj = plainToInstance(PagenationQueryDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  it('정상처리: Dto에 맞는 형식으로 1개만 들어온 경우', async () => {
    //given
    const requestDto = {
      page: 13,
    };
    const requestDtoObj = plainToInstance(PagenationQueryDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  describe('page field validation', () => {
    it('에러발생: 숫자로 변환가능한 문자가 아닌경우', async() => {
      //given
      const requestDto = {
        page: 'true',
      };
      const requestDtoObj = plainToInstance(PagenationQueryDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isInt({
        value: parseInt('true'),
        property: 'page'
      }));
    });
  });

  describe('pageSize field validation', () => {
    it('에러발생: 숫자로 변환가능한 문자가 아닌경우', async() => {
      //given
      const requestDto = {
        pageSize: '십',
      };
      const requestDtoObj = plainToInstance(PagenationQueryDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isInt({
        value: parseInt('십'),
        property: 'pageSize'
      }));
    });
  });
});
