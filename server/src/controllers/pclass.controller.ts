import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Pclass} from '../models';
import {PclassRepository} from '../repositories';
import {gapiFilter} from '../utils/filter';

export class PclassController {
  constructor(
    @repository(PclassRepository)
    public pclassRepository: PclassRepository,
  ) { }

  @post('/pclass')
  @response(200, {
    description: 'Pclass model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pclass)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {
            title: 'NewPclass',
            exclude: ['_id'],
          }),
        },
      },
    })
    pclass: Omit<Pclass, '_id'>,
  ): Promise<Pclass> {
    return this.pclassRepository.create(pclass);
  }

  @get('/pclass/count')
  @response(200, {
    description: 'Pclass model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pclass) where?: Where<Pclass>,
  ): Promise<Count> {
    const lowlevelQuery = gapiFilter('pclass', {where}, 'COUNT(*)');
    if (!lowlevelQuery) {
      return this.pclassRepository.count(where);
    }
    const result = await this.pclassRepository.dataSource.execute(lowlevelQuery);
    if (result && result.length > 0) {
      return result[0];
    }
    return {count: 0};
  }

  @get('/pclass')
  @response(200, {
    description: 'Array of Pclass model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pclass, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pclass) filter?: Filter<Pclass>,
  ): Promise<Pclass[]> {
    let lowlevelQuery;
    filter = filter || {};
    if (filter.include) {
      lowlevelQuery = gapiFilter('pclass', filter, '_id');
    } else {
      lowlevelQuery = gapiFilter('pclass', filter);
    }

    if (!lowlevelQuery) {
      return this.pclassRepository.find(filter);
    }

    if (!filter.include) {
      return this.pclassRepository.dataSource.execute(lowlevelQuery);
    }
    const items = await this.pclassRepository.dataSource.execute(lowlevelQuery);
    let itemsInclude: Pclass[] = [];

    for (const item of items) {
      const newFilter = {where: {_id: item._id}, include: filter.include};
      const itemInclude: Pclass[] = await this.pclassRepository.find(newFilter);
      itemsInclude = itemsInclude.concat(itemInclude);
    }
    return itemsInclude;
  }

  @patch('/pclass')
  @response(200, {
    description: 'Pclass PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {partial: true}),
        },
      },
    })
    pclass: Pclass,
    @param.where(Pclass) where?: Where<Pclass>,
  ): Promise<Count> {
    return this.pclassRepository.updateAll(pclass, where);
  }

  @get('/pclass/{id}')
  @response(200, {
    description: 'Pclass model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pclass, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pclass, {exclude: 'where'}) filter?: FilterExcludingWhere<Pclass>
  ): Promise<Pclass> {
    return this.pclassRepository.findById(id, filter);
  }

  @patch('/pclass/{id}')
  @response(204, {
    description: 'Pclass PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pclass, {partial: true}),
        },
      },
    })
    pclass: Pclass,
  ): Promise<void> {
    await this.pclassRepository.updateById(id, pclass);
  }

  @put('/pclass/{id}')
  @response(204, {
    description: 'Pclass PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pclass: Pclass,
  ): Promise<void> {
    await this.pclassRepository.replaceById(id, pclass);
  }

  @del('/pclass/{id}')
  @response(204, {
    description: 'Pclass DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pclassRepository.deleteById(id);
  }
}
