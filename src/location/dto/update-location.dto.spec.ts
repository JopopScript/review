import { CustomValidateMessage } from "@/common/custom-validate-message";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateLocationDto } from "./update-location.dto";


describe('UpdateLocationDto', () => {
  it('정상처리: Dto에 맞는 형식으로 모두 들어온 경우', async () => {
    //given
    const requestDto = {
      name: 'A01-11-11',
      spaceId: 1,
    };
    const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  it('정상처리: Dto에 맞는 형식으로 하나만 들어온 경우', async () => {
    //given
    const requestDto = {
      name: 'A01-11-11',
    };
    const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  it('에러발생: 2개 모두 형식에 맞지 않는 경우', async() => {
    //given
    const requestDto = {
      name: '',
      spaceId: true,
    };
    const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(2);
    expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isNotEmpty({
      value: '',
      property: 'name'
    }));
    expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isInt({
      value: true,
      property: 'spaceId'
    }));
  });

  describe('name field validation', () => {
    it('에러발생: 빈문자열인 경우', async() => {
      //given
      const requestDto = {
        name: '',
      };
      const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isNotEmpty({
        value: '',
        property: 'name'
      }));
    });

    it('에러발생: 문자열이 아닌경우', async() => {
      //given
      const requestDto = {
        name: true,
      };
      const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isString({
        value: true,
        property: 'name'
      }));
    });

    it('에러발생: 길이가 20을 초과하는 경우', async() => {
      //given
      const requestDto = {
        name: '123456789012345678901234567890123456789012345678901234567890',
      };
      const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);
      
      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.maxLength({
        value: '123456789012345678901234567890123456789012345678901234567890',
        property: 'name',
        constraints: [50],
      }));
    });
  });

  describe('spaceId field validation', () => {
    it('에러발생: boolean이 아닌 경우', async() => {
      //given
      const requestDto = {
        spaceId: 'true',
      };
      const requestDtoObj = plainToInstance(UpdateLocationDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isInt({
        value: 'true',
        property: 'spaceId',
      }));
    });
  });
});