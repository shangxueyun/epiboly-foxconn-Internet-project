
module.exports = function () {
  function type2Name (type) {
    switch (type) {
      case 'anchor': return '锚点';
      case 'infrared': return '红外线传感器';
      case 'door': return '门磁传感器';
      case 'wateroffer': return '二次供水';
      case 'noise': return '噪声传感器';
      case 'manhole': return '智能井盖';
      case 'nh3': return '氨气传感器';
      case 'smoke': return '烟雾传感器';
      case 'smoke2': return '烟雾传感器(2)';
      case 'parking': return '停车场（地磁）';
      case 'hydrant': return '消防栓';
      case 'movement': return '动作传感器';
      case 'waterpressure': return '压力传感器（水压）';
    }
  }
  return {type2Name};
}