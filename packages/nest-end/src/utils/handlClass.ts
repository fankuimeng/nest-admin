import {
  applyIsOptionalDecorator,
  inheritPropertyInitializers,
  inheritTransformationMetadata,
  inheritValidationMetadata,
} from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { MetadataLoader } from '@nestjs/swagger/dist//plugin/metadata-loader';
import { clonePluginMetadataFactory } from '@nestjs/swagger/dist/type-helpers/mapped-types.utils';
import * as lodash from 'lodash';
import { BASE_REQUEST_DTO, BASE_RESPONSE_VO } from 'src/typinng/enum';
const modelPropertiesAccessor = new ModelPropertiesAccessor();

export function CustomType(
  classRef,
  type: BASE_REQUEST_DTO | BASE_RESPONSE_VO,
) {
  const fields = modelPropertiesAccessor.getModelProperties(classRef.prototype);

  class CustomType {
    constructor() {
      inheritPropertyInitializers(this, classRef);
    }
  }

  inheritValidationMetadata(classRef, CustomType);

  inheritTransformationMetadata(classRef, CustomType);
  function applyFields(fields) {
    clonePluginMetadataFactory(CustomType, classRef.prototype, (metadata) => {
      const obj = {};
      Object.entries(metadata).forEach(([k, v]) => {
        const newMetadata = Reflect.getMetadata(
          `swagger/apiModelProperties`,
          classRef.prototype,
          k,
        );
        if (v.required && !newMetadata?.[type]) {
          Object.assign(v, { required: false });
          obj[k] = v;
        }
      });
      return obj;
    });
    fields.forEach((propertyKey) => {
      const metadata = Reflect.getMetadata(
        `swagger/apiModelProperties`,
        classRef.prototype,
        propertyKey,
      );
      if (metadata[type]) {
        Object.assign(metadata, { required: false });
        delete metadata[type];
        const decoratorFactory = ApiProperty(metadata);
        decoratorFactory(CustomType.prototype, propertyKey);
      }
    });
  }
  applyFields(fields);

  MetadataLoader.addRefreshHook(() => {
    const fields = modelPropertiesAccessor.getModelProperties(
      classRef.prototype,
    );
    applyFields(fields);
  });
  return CustomType;
}
