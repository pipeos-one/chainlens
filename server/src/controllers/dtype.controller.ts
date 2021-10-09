import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Dtype} from '../models';
import {DtypeRepository} from '../repositories';
import {gapiFilter} from '../utils/filter';

export class DtypeController {
  constructor(
    @repository(DtypeRepository)
    public dtypeRepository : DtypeRepository,
  ) {}

  @post('/dtype', {
    responses: {
      '200': {
        description: 'Dtype model instance',
        content: {'application/json': {schema: getModelSchemaRef(Dtype)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {
            title: 'NewDtype',
            exclude: ['_id'],
          }),
        },
      },
    })
    dtype: Omit<Dtype, '_id'>,
  ): Promise<Dtype> {
    return this.dtypeRepository.create(dtype);
  }

  @get('/dtype/count', {
    responses: {
      '200': {
        description: 'Dtype model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Dtype)) where?: Where<Dtype>,
  ): Promise<Count> {
    // return this.dtypeRepository.count(where);

    const lowlevelQuery = gapiFilter('dtype', { where }, 'COUNT(*)');
    if (!lowlevelQuery) {
      return this.dtypeRepository.count(where);
    }
    const result = await this.dtypeRepository.dataSource.execute(lowlevelQuery);
    if (result && result.length > 0) {
      return result[0];
    }
    return {count: 0};
  }

  @get('/dtype', {
    responses: {
      '200': {
        description: 'Array of Dtype model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Dtype, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Dtype)) filter?: Filter<Dtype>,
  ): Promise<Dtype[]> {
    // return this.dtypeRepository.find(filter);

    let lowlevelQuery;
    filter = filter || {};
    if (filter.include) {
      lowlevelQuery = gapiFilter('dtype', filter, '_id');
    } else {
      lowlevelQuery = gapiFilter('dtype', filter);
    }

    if (!lowlevelQuery) {
      return this.dtypeRepository.find(filter);
    }

    if (!filter.include) {
      return this.dtypeRepository.dataSource.execute(lowlevelQuery);
    }
    const items = await this.dtypeRepository.dataSource.execute(lowlevelQuery);
    let itemsInclude: Dtype[] = [];

    for (let i = 0; i < items.length; i++) {
      const newFilter = {where: {_id: items[i]._id}, include: filter.include};
      const itemInclude: Dtype[] = await this.dtypeRepository.find(newFilter);
      itemsInclude = itemsInclude.concat(itemInclude);
    }
    return itemsInclude;
  }

  @patch('/dtype', {
    responses: {
      '200': {
        description: 'Dtype PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {partial: true}),
        },
      },
    })
    dtype: Dtype,
    @param.query.object('where', getWhereSchemaFor(Dtype)) where?: Where<Dtype>,
  ): Promise<Count> {
    return this.dtypeRepository.updateAll(dtype, where);
  }

  @get('/dtype/{id}', {
    responses: {
      '200': {
        description: 'Dtype model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Dtype, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Dtype)) filter?: Filter<Dtype>
  ): Promise<Dtype> {
    return this.dtypeRepository.findById(id, filter);
  }

  @patch('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Dtype, {partial: true}),
        },
      },
    })
    dtype: Dtype,
  ): Promise<void> {
    await this.dtypeRepository.updateById(id, dtype);
  }

  @put('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dtype: Dtype,
  ): Promise<void> {
    await this.dtypeRepository.replaceById(id, dtype);
  }

  @del('/dtype/{id}', {
    responses: {
      '204': {
        description: 'Dtype DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dtypeRepository.deleteById(id);
  }
}
