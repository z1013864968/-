<template>
  <el-form-item label="频道：">
    <el-select :value="value" @change="fn" placeholder="请选择" clearable>
      <el-option
      v-for="item in Coptions"
      :key="item.id"
      :label="item.name"
      :value="item.id"></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
    //   value: null,
      Coptions: []
    }
  },
  methods: {
    // 值改变函数
    fn (channelsID) {
      if (channelsID === '')channelsID = null
      this.$emit('input', channelsID)
    },
    //   获取频道列表
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.Coptions = data.channels
    }

  },
  created () {
    this.getChannelOptions()
  }
}
</script>

<style>
</style>
