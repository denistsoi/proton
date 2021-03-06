<template>
    <div class="card">
        <p-loader v-if="loading"></p-loader>

        <div class="card__body">
            <h2 v-if="title">{{ title }}</h2>
            
            <form action="#" @submit.prevent="getRecords">
                <label for="column" class="form__label">Filter</label>

                <div class="row" style="margin-bottom: 0;">
                    <div class="col sm:w-1/4">
                        <div class="relative">
                            <p-select name="column" v-model="filter.column" :options="columns">
                            </p-select>

                            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="col sm:w-1/4">
                        <div class="relative">
                            <p-select name="operator" v-model="filter.operator" :options="[
                                {
                                    'label': 'equals',
                                    'value': 'equals',
                                },
                                {
                                    'label': 'contains',
                                    'value': 'contains',
                                },
                                {
                                    'label': 'starts with',
                                    'value': 'starts_with',
                                },
                                {
                                    'label': 'ends with',
                                    'value': 'ends_with',
                                },
                                {
                                    'label': 'greater than',
                                    'value': 'greater_than',
                                },
                                {
                                    'label': 'lesser than',
                                    'value': 'lesser_than',
                                },
                            ]">
                            </p-select>

                            <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="col sm:w-1/2">
                        <div class="input__group">
                            <input type="text" class="form__control" name="value" v-model="filter.value">

                            <div class="input__group--append">
                                <p-button type="submit">Submit</p-button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div class="row" style="margin-bottom: 0;">
                <div class="col sm:w-5/6">
                    <p-input
                        name="search"
                        label="Search"
                        v-model="search"
                    ></p-input>
                </div>

                <div class="col sm:w-1/6">
                    <label for="limit" class="form__label">Records Per Page</label>

                    <div class="relative">
                        <p-select name="limit" v-model="pagination.perPage" @change="changeLimit" :options="[
                            {
                                label: '1',
                                value: 1,
                            },
                            {
                                label: '5',
                                value: 5,
                            },
                            {
                                label: '10',
                                value: 10,
                            },
                            {
                                label: '25',
                                value: 25,
                            },
                            {
                                label: '50',
                                value: 50,
                            },
                            {
                                label: '100',
                                value: 100,
                            },
                            {
                                label: '500',
                                value: 500,
                            },
                            {
                                label: '1000',
                                value: 1000,
                            },
                        ]">
                        </p-select>

                        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="records.length">
            <table>
                <thead>
                    <tr>
                        <th v-for="(column, index) in displayable" :key="index">
                            <span class="sortable" @click="sortRecordsBy(column)">{{ column_names[column] || column }}</span>

                            <div
                                class="arrow"
                                :class="{
                                    'arrow--asc': (sort.order === 'asc'),
                                    'arrow--desc': (sort.order === 'desc'),
                                }"
                                v-if="sort.key === column">
                            </div>
                        </th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(record, index) in records" :key="index">
                        <td v-for="(columnValue, column) in record" :key="column">
                            <slot :name="column" :value="columnValue">
                                {{ columnValue }}
                            </slot>
                        </td>
                        <td class="text-right">
                            <slot name="actions" :record="record">
                                <a href="#" class="text-danger hover:text-danger-dark" @click.prevent="destroy(record.id)">Delete</a>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
        
            <div class="card__body text-right">
                <p-pagination
                    @pagechanged="changePage($event)"
                    :total-pages="this.pagination.totalPages"
                    :total="this.pagination.totalRecords"
                    :per-page="this.pagination.perPage"
                    :current-page="this.pagination.currentPage"
                ></p-pagination>
            </div>
        </div>        
    </div>
</template>

<script>
    import _ from 'lodash'
    import axios from 'axios'
    import queryString from 'query-string'

    export default {
        name: 'p-datatable',

        data() {
            return {
                loading: true,
                displayable: [],
                column_names: [],
                records: [],
                search: '',

                pagination: {
                    totalRecords: 0,
                    currentPage: 1,
                    totalPages: 0,
                    perPage: 1,
                },

                filter: {
                    column: this.sortBy,
                    operator: 'equals',
                    value: '',
                },

                sort: {
                    key: this.sortBy,
                    order: this.sortIn,
                },
            }
        },

        computed: {
            columns() {
                let columns = []

                _.forEach(this.displayable, (option) => {
                    columns.push({
                        'label': this.column_names[option],
                        'value': option,
                    })
                })

                return columns
            }
        },

        props: {
            title: {
                required: false,
                type: String,
                default: '',
            },

            noRecords: {
                required: false,
                type: String,
                default: 'No records to display',
            },

            endpoint: {
                required: true,
                type: String,
            },

            sortBy: {
                required: false,
                type: String,
                default: 'id',
            },

            sortIn: {
                required: false,
                type: String,
                default: 'asc',
            },
        },

        mounted() {
            this.getRecords()
        },

        methods: {
            getRecords() {
                this.loading = true

                return axios.get(`${this.endpoint}?${this.getQueryParameters()}`).then((response) => {
                    this.records = response.data.records.data
                    this.displayable = response.data.displayable
                    this.column_names = response.data.column_names
                    this.pagination.totalRecords = response.data.records.total
                    this.pagination.totalPages = response.data.records.last_page

                    this.loading = false
                })
            },

            getQueryParameters() {
                return queryString.stringify({
                    limit: this.pagination.perPage,
                    page: this.pagination.currentPage,
                    orderBy: this.sort.key,
                    orderDirection: this.sort.order,
                    column: this.filter.column,
                    operator: this.filter.operator,
                    value: this.filter.value,
                })
            },

            sortRecordsBy(column) {
                this.sort.key = column
                this.sort.order = this.sort.order === 'asc' ? 'desc' : 'asc'

                this.getRecords()
            },

            changePage(page) {
                this.pagination.currentPage = page

                this.getRecords()
            },

            changeLimit() {
                this.pagination.currentPage = 1

                this.getRecords()
            },

            destroy(id) {
                axios.delete(`${this.endpoint}/${id}`).then(() => {
                    this.getRecords()
                })
            },
        }
    }
</script>
