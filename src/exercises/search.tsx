import React, { useState, useEffect } from 'react';
import { DrawerAppContent } from '@rmwc/drawer';
import { Grid, GridCell } from '@rmwc/grid';
import { SimpleDataTable } from '@rmwc/data-table';
import '@material/drawer/dist/mdc.drawer.css';
import '@rmwc/data-table/data-table.css';
import '@material/layout-grid/dist/mdc.layout-grid.css';
import _ from 'underscore';

const nintendoUrl ="/nintendo"
const twitterUrl ="/nintendo"

function arrayToRows<T>(entries: T[]): T[][] {
    return _.toArray(_.chunk(entries, 1));
}

export const Engine: React.FC = () => {
    const [values, setValues] = useState<string[][]>([])

    const search = () => {
        // Set Values here
    };

    return (
        <DrawerAppContent>
            <Grid>
                <GridCell span={12}>
                    <h1>Search</h1>
                    <p>Create a search engine that will search the provided tweets in the URLS based on the twitter text</p>
                    <input type="text" placeholder="search criteria" />
                    <button onClick={() => search()}>Search</button>
                </GridCell>
                <GridCell span={12}>
                    <SimpleDataTable
                        headers={[["screen_name", "name", "tweet"]]}
                        data={values}
                    />
                </GridCell>
            </Grid>
        </DrawerAppContent>
    );
}
