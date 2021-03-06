<?php
/**
 * @copyright Copyright (C) 2015-2017 AIZAWA Hina
 * @license https://github.com/fetus-hina/stat.ink/blob/master/LICENSE MIT
 * @author AIZAWA Hina <hina@bouhime.com>
 */

namespace app\components\db;

use yii\db\Schema;

class Migration extends \yii\db\Migration
{
    public function apiKey(int $length = 16)
    {
        return $this->string($length)->notNull()->unique();
    }

    public function timestampTZ(int $precision = 0, bool $withTZ = true)
    {
        $type = sprintf('TIMESTAMP(%d) %s TIME ZONE', $precision, $withTZ ? 'WITH' : 'WITHOUT');
        $builder = $this->getDb()->getSchema()->createColumnSchemaBuilder($type);
        $builder->categoryMap[$type] = $builder->categoryMap[Schema::TYPE_TIMESTAMP];
        return $builder;
    }

    public function pkRef(string $table, string $column = 'id')
    {
        return $this->integer()->notNull()->append(sprintf(
            'REFERENCES {{%s}}([[%s]])',
            $table,
            $column
        ));
    }

    public function bigPkRef(string $table, string $column = 'id')
    {
        return $this->bigInteger()->notNull()->append(sprintf(
            'REFERENCES {{%s}}([[%s]])',
            $table,
            $column
        ));
    }

    public function tablePrimaryKey($columns) : string
    {
        if (is_string($columns)) {
            $columns = preg_split('/\s*,\s*/', $columns, -1, PREG_SPLIT_NO_EMPTY);
        }

        return sprintf(
            'PRIMARY KEY ( %s )',
            implode(', ', array_map(
                function (string $column) : string {
                    return $this->db->quoteColumnName($column);
                },
                (array)$columns
            ))
        );
    }

    public function analyze($table) : void
    {
        $this->execute("VACUUM ANALYZE {{{$table}}}");
    }
}
