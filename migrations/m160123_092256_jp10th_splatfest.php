<?php
use yii\db\Migration;
use app\models\{
    Region,
    Splatfest
};

class m160123_092256_jp10th_splatfest extends Migration
{
    public function safeUp()
    {
        $festId = Splatfest::findOne([
            'region_id' => Region::findOne(['key' => 'jp'])->id,
            'order' => 10,
        ])->id;

        $this->update('splatfest_team', ['color_hue' => 110], ['fest_id' => $festId, 'team_id' => 1]);
        $this->update('splatfest_team', ['color_hue' =>  22], ['fest_id' => $festId, 'team_id' => 2]);
    }

    public function safeDown()
    {
        $festId = Splatfest::findOne([
            'region_id' => Region::findOne(['key' => 'jp'])->id,
            'order' => 10
        ])->id;

        $this->update('splatfest_team', ['color_hue' => null], ['fest_id' => $festId]);
    }
}