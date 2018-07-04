import HighCharts from 'highcharts/';
import boost from 'highcharts/modules/boost';
import exporting from 'highcharts/modules/exporting';
import offlineExporting from 'highcharts/modules/offline-exporting';

boost(HighCharts);
exporting(HighCharts);
offlineExporting(HighCharts);

export default HighCharts;
